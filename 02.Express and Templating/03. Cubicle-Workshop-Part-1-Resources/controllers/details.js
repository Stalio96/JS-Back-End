module.exports = {
    details: async (req, res) => {
        const id = await req.params.id;
        const cube = await req.storage.getById(id);
        const ctx = {
            title: 'Details page',
            cube
        }
        res.render('details', ctx);
    }
}