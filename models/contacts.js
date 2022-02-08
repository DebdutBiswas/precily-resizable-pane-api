module.exports = mongoose => {
    const contactSchema = mongoose.Schema (
        {
            name: String,
            phone: String
        },
        {
            timestamps: true
        }
    );

    contactSchema.method('toJSON', function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model('contacts', contactSchema);
};