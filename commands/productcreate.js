module.exports = {
    name: "productcreate",
    description: "Crea un nuevo producto en el sistema",
    type: "CHAT_INPUT",
    options: [
        {
            name: "nombre",
            description: "Nombre del producto",
            type: 3,
            required: true
        },
        {
            name: "stock",
            description: "Stock inicial del producto",
            type: 4,
            required: true
        },
        {
            name: "descripcion",
            description: "Descripción del producto",
            type: 3,
            required: false
        }
    ],

    run: async (client, interaction) => {
        const nombre = interaction.options.getString("nombre");
        const stock = interaction.options.getInteger("stock");
        const descripcion = interaction.options.getString("descripcion") || "Sin descripción";

        interaction.reply(`Producto **${nombre}** creado con **${stock}** unidades. Descripción: **${descripcion}**.`);
    }
};

