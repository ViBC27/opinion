import { format } from 'timeago.js';

function timeago(timestamp) {
    return format(timestamp);
}

export default {
    timeago
};
