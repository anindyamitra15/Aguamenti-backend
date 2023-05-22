import * as cron from 'node-cron';
import { TypedServer } from '../dtos/socket.io.dtos';
import Schedule, { ScheduleInterface } from '../models/schedule.model';
import Device from '../models/device.model';
import { HouseInterface } from '../models/house.model';


const enableCron = (socket: TypedServer) => {
    // cron.schedule('26 1 * 5 1,2,3', () => {
    //     console.log('fired..');

    //     socket
    //         .to(`pibzrzuvgg/10441820`)
    //         .emit("device_sync", {
    //             key: 0,
    //             state: true
    //         });
    // });
    cron.schedule("* * * * *", async () => {
        // fetch all the cron strings from schedule database
        const findSchedules = await Schedule.find({ isScheduled: false, trigger_type: 'timing' });
        const numSchedules = findSchedules.length;
        if (!numSchedules) return;
        console.log(numSchedules, "schedule(s) found!");
        // schedule the cron in loop
        findSchedules.forEach(async (schedule: ScheduleInterface) => {
            if (!schedule.cron) return;
            const findTargetDevice = await Device.findOne({ chip_id: schedule.linked_chip_id }).populate('house_id');
            if (!findTargetDevice) return;
            if (!findTargetDevice.house_id) return;
            const data = findTargetDevice.chip_id.split('-');
            const segments = data.length;
            const house: HouseInterface = findTargetDevice.house_id as HouseInterface;
            let state: boolean;
            switch (schedule.schedule_type) {
                case "on":
                    state = true;
                    break;
                case "off":
                    state = false;
                    break;
            }

            cron.schedule(schedule.cron, () => {
                console.log("[cron] time event fired to", findTargetDevice.name, {state});
                socket
                    .to(`${house.endpoint}/${data[0]}`)
                    .emit("device_sync", {
                        key: (segments > 1) ? Number(data[1]) : 0,
                        state
                    });
            });

        });
        await Schedule.updateMany({ isScheduled: false, trigger_type: 'timing' }, { isScheduled: true });
    });
};
export default enableCron;

