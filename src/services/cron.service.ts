import * as cron from 'node-cron';
import { TypedServer } from '../dtos/socket.io.dtos';
import Schedule, { ScheduleInterface } from '../models/schedule.model';
import Device from '../models/device.model';
import { HouseInterface } from '../models/house.model';


const enableCron = (socket: TypedServer) => {

    Schedule.updateMany(
        { trigger_type: 'timing' },
        { isScheduled: false }
    ).then(async _ => {

        console.log('Timing Schedules activated!');

        cron.schedule("* * * * *", async () => {
            // fetch all the cron strings from schedule database
            const findSchedules = await Schedule.find(
                {
                    enabled: true,
                    isScheduled: false,
                    trigger_type: 'timing'
                }
            );
            const numberOfSchedules = findSchedules.length;
            if (!numberOfSchedules) return;
            console.log(numberOfSchedules, "schedule(s) yet to be scheduled.");

            // schedule the cron in loop
            findSchedules.forEach(async (schedule: ScheduleInterface) => {
                if (!schedule.cron || !schedule.linked_chip_id) return;
                // check for device validity/existence
                const findTargetDevice = await Device.findOne({ chip_id: schedule.linked_chip_id }).populate('house_id');
                if (!findTargetDevice || !findTargetDevice.house_id) return;

                // address[0] contains the chip id
                // address[1] contains the key number
                const address = findTargetDevice.chip_id.split('-');
                const segments = address.length;
                const house: HouseInterface = findTargetDevice.house_id as HouseInterface;

                let state: boolean | undefined;
                switch (schedule.schedule_type) {
                    case "on":
                        state = true;
                        break;
                    case "off":
                        state = false;
                        break;
                    default:
                        state = undefined;
                }

                const payload = {
                    key: (segments > 1) ? Number(address[1]) : 0,
                    state
                };

                cron.schedule(schedule.cron, () => {
                    console.log(
                        "[cron] time event fired to",
                        `${house.endpoint}/${address}`,
                        payload
                    );

                    socket
                        .to(`${house.endpoint}/${address[0]}`)
                        .emit("to_device", payload);
                });

            });
            await Schedule.updateMany({ enabled: true, isScheduled: false, trigger_type: 'timing' }, { isScheduled: true });
        }
        );
    }
    );
};
export default enableCron;
