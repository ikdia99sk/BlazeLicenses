const { MessageEmbed } = require("discord.js");
const { precios } = require("../prices.js"); // Asegúrate de que prices.js esté en la raíz

module.exports = {
    name: "productlist",
    description: "List of products",
    type: "CHAT_INPUT",

    run: async (client, interaction) => {

        // Sustituye este array por tus productos reales si los cargas desde DB
        const productos = [
            { nombre: "TikTok 1k Follow UHQ", stock: 10 },
            { nombre: "TikTok 1k Follow LQ", stock: 20 },
            { nombre: "Instagram 1k Likes", stock: 15 },
            { nombre: "ChatGPT (mail, no login)", stock: 8 },
            { nombre: "Spotify Premium 1 Mes", stock: 12 },
            { nombre: "Deco Random", stock: 30 },
            { nombre: "14 Boosts 1 Mes", stock: 5 },
            { nombre: "Nitro Boost (gift)", stock: 7 },
            { nombre: "Nitro Classic (login)", stock: 9 },
            { nombre: "Netflix", stock: 14 },
            { nombre: "Disney", stock: 11 },
            { nombre: "Disney + Hulu", stock: 9 },
            { nombre: "HBO", stock: 13 },
            { nombre: "DAZN (all types / all channels)", stock: 6 },
            { nombre: "CapCut", stock: 18 },
            { nombre: "Crunchyroll Mega Fan", stock: 10 },
            { nombre: "Crunchyroll Fan Member", stock: 7 },
            { nombre: "Amazon Prime (own account)", stock: 20 },
            { nombre: "YouTube Premium", stock: 16 },
            { nombre: "Filmora", stock: 5 }
        ];

        const categorias = {
            TikTok: "📱",
            Instagram: "📲",
            ChatGPT: "🌐",
            Spotify: "🎵",
            Deco: "🎨",
            Boosts: "🔅",
            Nitro: "🔮",
            "Nitro Classic": "💿",
            Netflix: "📺",
            Disney: "✨",
            HBO: "🎬",
            DAZN: "⚽",
            CapCut: "✂️",
            Crunchyroll: "🍥",
            Amazon: "📦",
            YouTube: "▶️",
            Filmora: "💻"
        };

        const agrupados = {};

        for (const p of productos) {
            const categoria = Object.keys(categorias).find(cat =>
                p.nombre.toLowerCase().includes(cat.toLowerCase())
            ) || "Otros";

            if (!agrupados[categoria]) agrupados[categoria] = [];
            agrupados[categoria].push(p);
        }

        const embed = new MessageEmbed()
            .setTitle("📦 Product list")
            .setColor("#00AEEF")
            .setTimestamp();

        let descripcion = "";

        for (const categoria in agrupados) {
            const emoji = categorias[categoria] || "📦";
            descripcion += `\n**${emoji} ${categoria}**\n`;

            for (const p of agrupados[categoria]) {
                const precio = precios[p.nombre] || "Sin precio";
                descripcion += `• **${p.nombre}**\n   Stock: **${p.stock}** | Precio: **${precio}**\n`;
            }
        }

        embed.setDescription(descripcion);

        interaction.reply({ embeds: [embed] });
    }
};
