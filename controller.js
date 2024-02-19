const db = require('./db');

class Controller {

    async getData(req, res) {
        // const data = await db.query('SELECT * FROM base_point'); 
        // const rooms = data.rows.map((d) => {

        //     const keys = Object.keys(d.coordinates);
            
        //     const coord = keys.map((key) => {
        //         return [d.coordinates[key].x, d.coordinates[key].y];
        //     });
        //     return {
        //         id: d.roomid,
        //         coordinates: coord
        //     };
        // })

        res.render(
            'map.hbs', {
            rooms: [],
        })
    }   
}

module.exports = new Controller();