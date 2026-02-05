module.exports = {
    name: "removeproduct",
    description: "Quita un producto a un usuario",
    type: "CHAT_INPUT",
    options: [
        {
            name: "usuario",
            description: "Usuario al que quitar el producto",
            type: 6,
            required: true
        },
        {
            name: "producto",
            description: "Producto a quitar",
            type: 3,
            required: true
        }
    ],

    run: async (client, interaction) => {
        const user = interaction.options.getUser("usuario");
        const producto = interaction.options.getString("producto");

        interaction.reply(`Producto **${producto}** removido de **${user.username}**.`);
    }
}
