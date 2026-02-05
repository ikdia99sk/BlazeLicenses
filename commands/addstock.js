module.exports = {
    name: "addstock",
    description: "Añade stock a un producto",
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
            description: "Cantidad a añadir",
            type: 4,
            required: true
        }
    ],

    run: async (client, interaction) => {
        const producto = interaction.options.getString("producto");
        const cantidad = interaction.options.getInteger("cantidad");

        if (!client.config.STOCK) client.config.STOCK = [];

        const item = client.config.STOCK.find(p => p.name === producto);

        if (item) item.amount += cantidad;
        else client.config.STOCK.push({ name: producto, amount: cantidad });

        interaction.reply(`Añadido **${cantidad}** a **${producto}**.`);
    }
}
