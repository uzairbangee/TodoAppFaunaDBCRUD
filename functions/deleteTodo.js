const faunadb = require('faunadb'),
  q = faunadb.query;
const dotenv = require('dotenv');
dotenv.config();

exports.handler = async (event, context) => {

    if (event.httpMethod !== "DELETE") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const {id} = JSON.parse(event.body);
    console.log(id)
    try{

        const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET_KEY });
        const result = await client.query(
            q.Delete (
                q.Ref(q.Collection("todos"), ""+id)
              )
        );

        return {
            statusCode: 200,
            body : 'true'
        }
    }
    catch(err){
        return {
            statusCode: 500,
            body: err.toString()
        }
    }
}