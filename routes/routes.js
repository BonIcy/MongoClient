const express = require('express');

const {MongoClient} = require ('mongodb');
require('dotenv').config();
const router = express.Router();
const bases = process.env.DDBB256;
const nombreBase = 'hamburgueseria'


router.get('/holi', async (req, res) => {
    try {
        console.log('Hola');
    } catch (error) {
        console.log(error.message);
    }
})

router.get('/endpoint1', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase)
        const collection = db.collection('ingredientes');
        const result = await collection.find({stock : { $lt : 400}}).toArray()
        res.json(result);
        client.close
        } catch (error) {
        console.log(error.message);
    }
})

router.get('/endpoint2', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase)
        const collection = db.collection('hamburguesas');
        const result = await collection.find({ categoria : 'Vegetariana'}).toArray()
        res.json(result);
        client.close
        } catch (error) {
        console.log(error.message);
    }
})

router.get('/endpoint3', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase)
        const collection = db.collection('chefs');
        const result = await collection.find({ especialidad : 'Carnes'}).toArray()
        res.json(result);
        client.close
        } catch (error) {
        console.log(error.message);
    }
})

router.put('/endpoint4', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase)
        const collection = db.collection('ingredientes');
        const result = await collection.updateMany({}, { $inc : { precio: 1.5 }}).toArray()
        res.json(result);
        client.close
        } catch (error) {
        console.log(error.message);
    }
})

router.get('/endpoint5', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase)
        const collection = db.collection('hamburguesas');
        const result = await collection.find({ chef : 'ChefB'}).toArray();
        res.json(result);
        client.close
        } catch (error) {
        console.log(error.message);
    }
})

router.get('/endpoint6', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase)
        const collection = db.collection('categorias');
        const result = await collection.find({}, { nombre: 1, descripcion: 1 }).toArray()
        res.json(result);
        client.close
        } catch (error) {
        console.log(error.message);
    }
})

router.delete('/endpoint7', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase)
        const collection = db.collection('ingredientes');
        const result = await collection.deleteMany({ stock: 0 })
        res.json(result);
        client.close
        } catch (error) {
        console.log(error.message);
    }
})

router.post('/endpoint8', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const nuevoIngrediente = {
            nombre: 'Name',
            descripcion: 'Descripción',
            precio: 2.0,
            stock: 100,
          };
        const collection = db.collection('ingredientes');
        const result = await collection.updateOne(
            { nombre: 'Clásica' },
            { $push: { ingredientes: nuevoIngrediente } })
        res.json(result);
        client.close
        } catch (error) {
        console.log(error.message);
    }
})

router.get('/endpoint9', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase)
        const collection = db.collection('hamburguesas');
        const result = await collection.find({ ingredientes: 'Pan integral' }).toArray()
        res.json(result);
        client.close
        } catch (error) {
        console.log(error.message);
    }
})

router.get('/endpoint10', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase)
        const collection = db.collection('Chefs');
        const result = await collection.updateOne(
            { nombre: 'ChefC' },
            { $set: { especialidad: 'cocina Internacional' }} )
        res.json(result);
        client.close
        } catch (error) {
        console.log(error.message);
    }
})


router.get('/endpoint11', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('ingredientes');
        const result = await collection.find().sort({ precio: -1 }).limit(1).toArray();
        res.json(result[0]);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});


router.get('/endpoint12', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.find({ ingredientes: { $not: { $in: ['Queso cheddar'] } } }).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});


router.put('/endpoint13', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('ingredientes');
        const result = await collection.updateOne(
            { nombre: 'Pan' },
            { $inc: { stock: 100 } }
        );
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/endpoint14', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('ingredientes');
        const result = await collection.find({ descripcion: { $regex: /clásico/i } }).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});


router.get('/endpoint15', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.find({ precio: { $lte: 9 } }).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/endpoint16', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('chefs');
        const result = await collection.countDocuments();
        res.json({ count: result });
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});


router.get('/endpoint17', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('categorias');
        const result = await collection.find({ descripcion: { $regex: /gourmet/i } }).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});


router.delete('/endpoint18', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.deleteMany({ $expr: { $lt: [{ $size: "$ingredientes" }, 5] } });
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});


router.post('/cendpoint19', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const nuevoChef = {
            nombre: 'ChefD',
            especialidad: 'Cocina Asiática'
        };
        const collection = db.collection('chefs');
        const result = await collection.insertOne(nuevoChef);
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});


router.get('/endpoint20', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.find().sort({ precio: 1 }).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});
router.get('/endpoint21', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('ingredientes');
        const result = await collection.find({ precio: { $gte: 2, $lte: 5 } }).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});


router.put('/endpoint22', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('ingredientes');
        const result = await collection.updateOne(
            { nombre: 'Pan' },
            { $set: { descripcion: 'Pan fresco y crujiente' } }
        );
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});
//23
router.get('/endpoint23', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.find({ ingredientes: { $in: ['Tomate', 'Lechuga'] } }).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/endpoint24', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('chefs');
        const result = await collection.find({ nombre: { $ne: 'ChefA' } }).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});


router.put('/endpoint25', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.updateMany(
            { categoria: 'Gourmet' },
            { $inc: { precio: 2 } }
        );
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});


router.get('/endpoint26', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('ingredientes');
        const result = await collection.find().sort({ nombre: 1 }).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});


router.get('/endpoint27', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.find().sort({ precio: -1 }).limit(1).toArray();
        res.json(result[0]);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});


router.post('/endpoint28', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.updateMany(
            { categoria: 'Clásica' },
            { $addToSet: { ingredientes: 'Pepinillos' } }
        );
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});

router.delete('/endpoint29', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('chefs');
        const result = await collection.deleteMany({ especialidad: 'Cocina Vegetariana' });
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});


router.get('/endpoint30', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.find({ ingredientes: { $size: 7 } }).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/endpoint31', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.aggregate([
            { $match: { chef: 'ChefC', categoria: 'Gourmet' } },
            { $sort: { precio: -1 } },
            { $limit: 1 }
        ]).toArray();
        res.json(result[0]);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/endpoint32', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.aggregate([
            { $unwind: '$ingredientes' },
            { $group: { _id: '$ingredientes', count: { $sum: 1 } } }
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/endpoint33', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.aggregate([
            { $group: { _id: '$chef', count: { $sum: 1 } } }
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/endpoint34', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.aggregate([
            { $group: { _id: '$categoria', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]).toArray();
        res.json(result[0]);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/endpoint35', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.aggregate([
            { $unwind: '$ingredientes' },
            { $lookup: { from: 'ingredientes', localField: 'ingredientes', foreignField: 'nombre', as: 'ingredientesData' } },
            {
                $group: {
                    _id: '$chef',
                    costoTotal: { $sum: { $sum: '$ingredientesData.precio' } }
                }
            }
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});
router.get('/endpoint36', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const hamburguesas = await db.collection('hamburguesas').distinct('ingredientes');
        const result = await db.collection('ingredientes').find({ nombre: { $nin: hamburguesas } }).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/endpoint37', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.aggregate([
            { $lookup: { from: 'categorias', localField: 'categoria', foreignField: 'nombre', as: 'categoriaData' } },
            { $project: { _id: 0, nombre: 1, 'categoriaData.descripcion': 1 } }
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});


router.get('/endpoint38', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.aggregate([
            { $unwind: '$ingredientes' },
            { $group: { _id: '$chef', ingredientesCount: { $sum: 1 } } },
            { $sort: { ingredientesCount: -1 } },
            { $limit: 1 }
        ]).toArray();
        res.json(result[0]);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});


router.get('/endpoint39', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const result = await db.collection('hamburguesas').aggregate([
            { $group: { _id: '$categoria', precioPromedio: { $avg: '$precio' } } }
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});


router.get('/endpoint40', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const result = await db.collection('hamburguesas').aggregate([
            { $group: { _id: '$chef', hamburguesaCara: { $max: '$precio' } } },
            { $lookup: { from: 'chefs', localField: '_id', foreignField: 'nombre', as: 'chefData' } },
            { $project: { _id: 0, 'chefData.nombre': 1, hamburguesaCara: 1 } }
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;