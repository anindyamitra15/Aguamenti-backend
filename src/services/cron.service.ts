import * as cron from 'node-cron';
import { TypedServer } from '../dtos/socket.io.dtos';

const enableCron = (socket: TypedServer)  => {
    // fetch all the cron strings from schedule database
    // schedule the cron in loop
    // cron.schedule()

};
export default enableCron;

