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
        const result = await collection.find({stock : { $lt : 400}}).toArray() //$lt es un operador de comparación de mongo que significa less than (menor que)
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
        const result = await collection.updateMany({}, { $inc : { precio: 1.5 }}).toArray() // $inc es un operador de actualización en mongo usado para incrementar (multiplicar)
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
        const result = await collection.find({}, { nombre: 1, descripcion: 1 }).toArray() //primer argumento vacio del método find ({})  significa que se recuperaran todos los documentos de la colección
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
        const nuevoIngr = {
            nombre: 'Name',
            descripcion: 'Descripción',
            precio: 2.0,
            stock: 100,
          };
        const collection = db.collection('ingredientes');
        const result = await collection.updateOne(
            { nombre: 'Clásica' },
            { $push: { ingredientes: nuevoIngr } }) //$push es un operador de actualización (mongo) hecho para agregar elementos a un array en un documento existente
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
            { $set: { especialidad: 'cocina Internacional' }} ) //$set se utiliza para cambiar o actualizar el valor de un campo especifico en un documento sin afectar otros campos ni reemplazar el documento completo
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
        const result = await collection.find().sort({ precio: -1 }).limit(1).toArray(); //limit es una función de consulta que se utiliza para limitar el número de documentos que se recuperan como resultado de una consulta, en este caso solo queremos recuperar 1 documento
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
        const result = await collection.find({ ingredientes: { $not: { $in: ['Queso cheddar'] } } }).toArray(); //not se usa para negar la expresion que esta en su interior
        //$in es para buscar coincidencias con uno de los valores proporcionados por el array
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
        const result = await collection.find({ descripcion: { $regex: /clasico/i } }).toArray(); // $regex permite buscar documentos cuyo campo cumpla con una expresión regular específica (lo que esta dentro de los slash /clasico/). la 'i' al final es para omitir mayusculas o minusculas y que estas no afecten la busqueda
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
        const result = await collection.find({ precio: { $lte: 9 } }).toArray(); // $lte evalua si un valor en un campo es menor o igual al valor especificado
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
        res.json({ count: result }); // literalmente es un contador XD
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
        const result = await collection.find({ descripcion: { $regex: /gourmet/i } }).toArray(); // misma logica empleada que en el endpoint 14
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
        // $expr se usa para evaluar una condicion
        // $size se utiliza para seleccionar documentos en función del tamaño de un campo de tipo array
        //si ingredientes tiene menos de 5 elementos en la longitud  se eliminara esa hamburguesa
        const result = await collection.deleteMany({ $expr: { $lt: [{ $size: "$ingredientes" }, 5] } });
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});


router.post('/endpoint19', async (req, res) => {
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
        const result = await collection.find().sort({ precio: 1 }).toArray();  // el sort ordena los resultados de acuerdo al precio en orden ascendente
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
        const result = await collection.find({ precio: { $gte: 2, $lte: 5 } }).toArray(); // buscamos ingredientes que su precio sea mayor o igual a 2 y menor o igual a 5, empleando $gte(mayor o igual) y $lte(menor o igual)
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
            { $set: { descripcion: 'Pan fresco y crujiente' } } //utilizamos set nuevamente para actualizar o cambiar un dato especifico
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
        const result = await collection.find({ ingredientes: { $in: ['Tomate', 'Lechuga'] } }).toArray(); // $in comprueba si al menos uno de los valores dichos se encuentra en el array
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
        const result = await collection.find({ nombre: { $ne: 'ChefA' } }).toArray(); //verifica que el nombre del chef sea diferente a ChefA, con $ne
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
            { $inc: { precio: 2 } } //el primer argumento selecciona a los gourmet y el segundo actualiza su precio
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
        const result = await collection.find().sort({ nombre: 1 }).toArray(); //ordenar por nombre (alfabeticament)
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
        const result = await collection.find().sort({ precio: -1 }).limit(1).toArray(); //ordena las hamburguesas de manera descendente (-1), y el limit solo deja obtener la primera, o sea la mas cara
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
            { $addToSet: { ingredientes: 'Pepinillos' } } // $addToSet es un operador de actualización  que se utiliza para agregar un elemento a un array si ese elemento no existe ya en ese array. En este caso, se agrega pepinillos a los ingredientes de las hamburguesas clasicas
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
        const result = await collection.find({ ingredientes: { $size: 7 } }).toArray(); //devuelve hamburguesas con justo 7 ingredientes
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
        const result = await collection.aggregate([ // aggregate() hace agregacion (es un proceso que permite realizar transformaciones y operaciones complejas en los datos antes de devolverlos) dentro de hamburguesas, la agregacion tiene 3 etapas ({})
            { $match: { chef: 'ChefC', categoria: 'Gourmet' } }, //se filtran los documentos que coinciden con el chef ChefC y la categoría gourmet
            { $sort: { precio: -1 } }, //se ordenan las hamburguesas restantes en orden descendente según el precio
            { $limit: 1 } //deja la mas cara unicamente
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
            { $unwind: '$ingredientes' }, // $unwind separa los datos de un array, en este caso deja cada ingrediente individual
            { $group: { _id: '$ingredientes', count: { $sum: 1 } } } // $group agrupa los ingredientes (por el id) y posteriormente count cuenta cuantos documentos hay en el grupo y suma 1 por cada uno
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
            { $group: { _id: '$chef', count: { $sum: 1 } } } //agrupamos los chefs y posteriormente añadimos un contador que suma 1 por cada chef en el grupo
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
            { $group: { _id: '$categoria', count: { $sum: 1 } } }, //categoria con mayor cantidad de hamburguesas
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
            { $lookup: { from: 'ingredientes', localField: 'ingredientes', foreignField: 'nombre', as: 'datos' } }, // con $lookup se realiza una busqueda de nombres de ingredientes y las almacena en datos
            {
                $group: {
                    _id: '$chef',
                    costoTotal: { $sum: { $sum: '$datos.precio' } } //agrupa los chefs y los precios totales sumados de los datos anteriores
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
        const result = await db.collection('ingredientes').find({ nombre: { $nin: hamburguesas } }).toArray(); //$nin singinfica que no coincide con ningun valor, en este caso devuelve los ingredientes que no esten en alguna hamburguesa
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
            { $project: { _id: 0, nombre: 1, 'categoriaData.descripcion': 1 } } //se especifica qué campos se incluirán o excluirán en el resultado , 0 para excluir y 1 para incluir
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
            { $limit: 1 } //chef con mayor cantidad de ingredientes total
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
            { $group: { _id: '$categoria', precioPromedio: { $avg: '$precio' } } } // $avg para calcular promedio
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
            { $project: { _id: 0, 'chefData.nombre': 1, hamburguesaCara: 1 } } // se muestra el nombre del chef y la hamburguesa con precio mayor
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;