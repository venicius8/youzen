import { ReactNode } from "react";

const Title = ({ children }: { children: ReactNode }) => (
  <h1 className="text-4xl md:text-5xl text-center my-20 font-bold">
    {children}
  </h1>
);

const Subtitle = ({ children }: { children: ReactNode }) => (
  <h2 className="text-2xl md:text-3xl mt-10 mb-4">{children}</h2>
);

const Paragraph = ({ children }: { children: ReactNode }) => (
  <p className="text-lg md:text-xl mb-4 text-gray-800">{children}</p>
);

const HL = ({ children }: { children: ReactNode }) => (
  <u className="underline-offset-4 bg-blue-300/40">{children}</u>
);

export default function About() {
  return (
    <section className="m-6">
      <Title>Sobre YouZen</Title>

      <Subtitle>O que é YouZen?</Subtitle>

      <Paragraph>
        YouZen é plataforma perfeita para quem deseja desacelerar a mente, obter
        mais serenidade e encontrar a paz interior.
      </Paragraph>
      <Paragraph>
        Aqui, há diversos recusos para alcançar diferentes objetivos, desde
        acalmar-se com a respiração profunda ao se sentir confiante lendo
        mensagens positivas e motivadoras
      </Paragraph>

      <Subtitle>Para quem é o YouZen é indicado?</Subtitle>

      <Paragraph>
        Para todas as pessoas, desde àquelas que estão descobrindo a meditação à
        quem bastante experiência com práticas meditativas, independentemente do
        gênero, idade ou qualquer outra segmentações.
      </Paragraph>
      <Paragraph>
        OBSERVAÇÃO: pessoas com quadro elevado de ansiedade, depressão ou pânico
        ainda podem utilizar este aplicativo, mas recomendo fortemente buscar
        ajuda profisional. Afinal de contas, sua saúde é em primeiro lugar.
      </Paragraph>

      <Subtitle>Por que esse app foi criado?</Subtitle>

      <Paragraph>
        Porque eu (Venícius) já passei por dias que já acordava cansado,
        desmotivado, ansioso e até vontade de largar tudo. E hoje em dia, após
        diversas tentativas para sair desse buraco, vejo quão difícil é viver
        assim, especialmente quando não temos apoio emocional.
      </Paragraph>
      <Paragraph>
        Então veio a ideia de ajudar pessoas como eu de antes, então uni códigos
        e experiência passadas, que resultou em YouZen. Carrego uma filosofia
        que, <HL>o mundo muda quando começamos mudando a si mesmo</HL>.
      </Paragraph>
    </section>
  );
}
