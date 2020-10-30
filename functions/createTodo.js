const faunadb = require('faunadb'),
  q = faunadb.query;
const dotenv = require('dotenv');
dotenv.config();

exports.handler = async (event, context) => {

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const {title} = JSON.parse(event.body);
    try{

        const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET_KEY });
        const result = await client.query(
            q.Create(q.Collection("todos"), {
                data : {
                    title: title,
                    completed: false
                }
            })
        );

        const data = {
            id: result.ref.id,
            ...result.data,
        }

        return {
            statusCode: 200,
            body : JSON.stringify(data)
        }
    }
    catch(err){
        return {
            statusCode: 500,
            body: err.toString()
        }
    }
}