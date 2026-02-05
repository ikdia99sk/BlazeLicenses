module.exports = {
    name: "removestock",
    description: "Quita stock de un producto",
    type: "CHAT_INPUT",
    options: [
        {
            name: "producto",
            description: "Nombre del producto",
            type: 3,
            required: true
        },
        {
            name: "cantidad",
            description: "Cantidad a quitar",
            type: 4,
            required: true
        }
    ],

    run: async (client, interaction) => {
        const producto = interaction.options.getString("producto");
        const cantidad = interaction.options.getInteger("cantidad");

        const item = client.config.STOCK?.find(p => p.name === producto);

        if (!item)
            return interaction.reply("Ese producto no existe.");

        item.amount -= cantidad;
        if (item.amount < 0) item.amount = 0;

        interaction.reply(`Quitado **${cantidad}** de **${producto}**.`);
    }
}
