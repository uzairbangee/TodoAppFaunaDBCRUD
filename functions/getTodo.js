const faunadb = require('faunadb'),
  q = faunadb.query;
const dotenv = require('dotenv');
dotenv.config();

exports.handler = async (event, context) => {
    try{

        const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET_KEY });
        const result = await client.query(
            q.Map(
                q.Paginate(q.Documents(q.Collection('todos'))),
                q.Lambda('todo', 
                  q.Let(
                        {
                        todoRef: q.Get(q.Var('todo')),
                        },
                        {
                        id : q.Select(["ref", "id"], q.Var('todoRef')),
                        title : q.Select(["data", "title"], q.Var('todoRef')),
                        completed : q.Select(["data", "completed"], q.Var('todoRef'))
                        }
                    )
                )
            )
        );

        return {
            statusCode: 200,
            body : JSON.stringify(result.data)
        }
    }
    catch(err){
        return {
            statusCode: 500,
            body: err.toString()
        }
    }
}