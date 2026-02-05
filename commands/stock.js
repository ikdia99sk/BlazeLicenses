module.exports = {
    name: "stock",
    description: "Muestra el stock actual de productos",
    type: "CHAT_INPUT",

    run: async (client, interaction) => {
        const stock = client.config.STOCK || [];

        if (!stock.length)
            return interaction.reply("No hay productos en stock.");

        const list = stock.map(p => `• **${p.name}** → ${p.amount}`).join("\n");

        interaction.reply({
            content: `📦 **Stock actual:**\n${list}`
        });
    }
}
