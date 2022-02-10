// Contact mongoose model export
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

    // Overriding _id key to id and removing __v key
    contactSchema.method('toJSON', function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model('contacts', contactSchema);
};