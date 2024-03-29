import * as Knex from "knex";
function baseTable(t: Knex.CreateTableBuilder, knex: Knex){
    t.bigIncrements("id")
    t.timestamp("createdAt").defaultTo(knex.fn.now())
    t.boolean("deleted").defaultTo(false)
}

export async function up(knex :Knex): Promise<any>{
    return knex.transaction(trx=>{
        return trx.schema
        .createTable("User", t =>{
            baseTable(t,trx)
            t.string("email")
            t.string("password")
            t.string("name")
            t.string("role")
        })
        .createTable("Todo",t => {
            baseTable(t, trx)
            t.string("todo")
            t.bigInteger("userId").unsigned().references("id").inTable("User")
            t.boolean("completed").defaultTo(false)
        })
        .createTable("Message",t=> {
            t.bigIncrements("messageId")
            t.bigInteger("senderId").unsigned().references("id").inTable("User")
            t.bigInteger("receiverId").unsigned().references("id").inTable("User")
            t.string("messageText")
        })
    })
};
export async function down(knex: Knex): Promise<any> {
    return knex.transaction(trx => {
        return trx.schema
        .dropTable("Todo")
        .dropTable("User")
        .dropTable("Message")
    })
};