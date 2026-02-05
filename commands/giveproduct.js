const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "giveproduct",
    description: "Entrega un producto a un usuario",
    type: "CHAT_INPUT",
    options: [
        {
            name: "usuario",
            description: "Usuario al que dar el producto",
            type: 6,
            required: true
        },
        {
            name: "producto",
            description: "Producto a entregar",
            type: 3,
            required: true
        },
        {
            name: "contenido",
            description: "Contenido adicional (cuentas, códigos, instrucciones, etc.)",
            type: 3,
            required: false
        }
    ],

    run: async (client, interaction) => {
        const user = interaction.options.getUser("usuario");
        const producto = interaction.options.getString("producto");
        const contenido = interaction.options.getString("contenido") || "Sin contenido adicional.";

        const embed = new MessageEmbed()
            .setTitle("📦 You received a product")
            .setDescription(`Producto: **${producto}**\n\nContenido entregado:\n${contenido}`)
            .setColor("#00AEEF")
            .setTimestamp()
            .setFooter("BlazeLicenses");

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("claim_product")
                .setLabel("Confirm reception")
                .setStyle("SUCCESS")
        );

        try {
            await user.send({ embeds: [embed], components: [row] });
        } catch (err) {
            return interaction.reply({
                content: `No pude enviar un DM a **${user.username}**. Probablemente tiene los mensajes privados desactivados.`,
                ephemeral: true
            });
        }

        interaction.reply(`Producto **${producto}** entregado a **${user.username}** y enviado por DM.`);

        const filter = i => i.customId === "claim_product" && i.user.id === user.id;

        client.on("interactionCreate", async i => {
            if (!filter(i)) return;

            await i.update({
                content: "Product confirmed correctly.",
                embeds: [],
                components: []
            });
        });
    }
};
