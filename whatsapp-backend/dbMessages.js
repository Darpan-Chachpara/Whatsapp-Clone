import mongoose from 'mongoose';

const whatsappSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean,
});

//collection messagecontent
export default mongoose.model('messagecontents',whatsappSchema);