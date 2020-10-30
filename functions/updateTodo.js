const faunadb = require('faunadb'),
  q = faunadb.query;
const dotenv = require('dotenv');
dotenv.config();

exports.handler = async (event, context) => {

    if (event.httpMethod !== "PATCH") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    console.log(event);

    const {id, completed} = JSON.parse(event.body);
    try{

        const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET_KEY });
        const result = await client.query(
            q.Update (
                q.Ref(q.Collection("todos"), ""+id),
                {
                    data: {
                      completed: completed
                    }
                }
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