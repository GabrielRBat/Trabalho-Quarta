function About() {
return (
<div className="min-h-screen bg-white flex items-center justify-center px-6 pt-24 py-16">
<div className="max-w-3xl text-center">
<h1 className="text-4xl font-bold text-red-600 mb-6">Sobre a Marmitaria Leozitos</h1>

<p className="text-lg text-gray-800 leading-relaxed mb-6">
Fundada em 2023, a <strong className="text-black">Marmitaria Leozitos</strong> nasceu com um propósito simples:
levar sabor, qualidade e praticidade para o seu dia a dia. Desde o início, nos dedicamos a preparar marmitas
caseiras com ingredientes frescos, temperos na medida certa e muito carinho em cada detalhe.
</p>

<p className="text-lg text-gray-800 leading-relaxed">
Aqui, acreditamos que uma boa refeição vai além do prato — ela alimenta o corpo e acolhe a alma.
Seja para sua rotina do trabalho, estudos ou aquela pausa merecida, conte com a Leozitos para garantir
uma experiência deliciosa, prática e feita com dedicação.
</p>
<div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
{/* Missão */}
<div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow hover:shadow-md transition">
<h3 className="text-xl font-bold text-red-600 mb-2">Missão</h3>
<p className="text-gray-700 text-sm leading-relaxed">
    Levar praticidade, sabor e carinho às pessoas por meio de marmitas caseiras,
    feitas com ingredientes de qualidade e dedicação em cada preparo.
</p>
</div>

{/* Visão */}
<div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow hover:shadow-md transition">
<h3 className="text-xl font-bold text-yellow-600 mb-2">Visão</h3>
<p className="text-gray-700 text-sm leading-relaxed">
    Ser reconhecida como referência em alimentação prática, acessível e caseira,
    mantendo sempre o cuidado e o sabor como diferenciais.
</p>
</div>

{/* Valores */}
<div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow hover:shadow-md transition">
<h3 className="text-xl font-bold text-green-600 mb-2">Valores</h3>
<p className="text-gray-700 text-sm leading-relaxed">
    Compromisso com o cliente, qualidade nos ingredientes, respeito ao próximo,
    transparência, empatia e amor pelo que fazemos.
</p>
</div>
</div>

    </div>
    </div>
);
}

export default About;
