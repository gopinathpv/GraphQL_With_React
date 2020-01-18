const graphql = require('graphql')
const _ = require('lodash')
const { GraphQLObjectType ,GraphQLString , GraphQLSchema,GraphQLID ,GraphQLInt , GraphQLList, GraphQLNonNull} = graphql;
const Moviess = require('../models/movie')
const Directorss = require('../models/director')

const MovieType = new GraphQLObjectType({
    name: 'Movies',
    fields:()=>({
        id: {type: GraphQLID},
        name :{ type: GraphQLString},
        genre :{type:GraphQLString},
        directors:{
            type:DirectorType,
            resolve(parent){
                return Directorss.findById(parent.directorId)

            }
        }
    })
})


const DirectorType = new GraphQLObjectType({
    name: 'Directors',
    fields:()=>({
        id: {type: GraphQLID},
        name :{ type: GraphQLString},
        age :{type:GraphQLInt},
        movies:{
            type: new GraphQLList(MovieType),
            resolve(parent,args){
                console.log(parent)
                return Moviess.find({directorId: parent.id})

            }
        }
    })
})

const Query = new GraphQLObjectType({
    name: 'MainQuery',
    fields:{
        movie: {
            type: MovieType,
            args:{id: {type:GraphQLID}},
            resolve(parent, args){
                console.log("got the ars",args)
                return Moviess.findById(args.id)
            }
        },
       director:{
           type:DirectorType,
           args:{id:{type:GraphQLID}},
           resolve(parent,args){
            console.log("got the ss",args)
            return Directorss.findById(args.id)
           }
       },
       movies:{
           type: new GraphQLList(MovieType),
           resolve(parent,args){
            return Moviess.find({})
           }
       },
       directors:{
        type: new GraphQLList(DirectorType),
        resolve(parent,args){
            return Directorss.find({})

        }
    },
    }
})


const Mutations =  new GraphQLObjectType({
    name :"Mutation",
    fields:{
        addDirector:{
            type: DirectorType,
            args: {
                name: {type: new GraphQLNonNull (GraphQLString)},
                age : {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                let director = new Directorss({
                    name : args.name,
                    age : args.age
                })
                return director.save()
            }
        },
        addMovie:{
            type: MovieType,
            args: {
                name: {type:new GraphQLNonNull (GraphQLString)},
                genre : {type: new GraphQLNonNull (GraphQLString)},
                directorId :{type: new GraphQLNonNull (GraphQLID)}
            },
            resolve(parent, args){
                let movie = new Moviess({
                    name : args.name,
                    genre : args.genre,
                    directorId: args.directorId
                    })
                return movie.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query : Query, 
    mutation : Mutations
})