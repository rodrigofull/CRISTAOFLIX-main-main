import { useState } from "react";

export function MeusLivros() {
  const [livros] = useState([
    {
      id: "1",
      titulo: "Conexão Homem Deus - Lançamento em breve",
      capa: "https://iili.io/fHtZPO7.jpg",
    },
    {
      id: "2",
      titulo: "Os 2 dias  oseias - em produção",
      capa: "https://m.media-amazon.com/images/I/71V8M5FUlrL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: "3",
      titulo: "O ultimo ano da terra - em breve",
      capa: "https://m.media-amazon.com/images/I/81rdqRLVLFSL._AC_UF1000,1000_QL80_.jpg",
    },
  ]);

  return (
    <div className="pt-24 px-6 container mx-auto">
      <h1 className="text-4xl font-bold text-primary mb-8">Meus Livros</h1>

      {livros.length === 0 ? (
        <p className="text-muted-foreground text-lg">
          Você ainda não possui livros adicionados.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {livros.map((livro) => (
            <div
              key={livro.id}
              className="bg-card rounded-xl shadow-md p-3 hover:scale-105 transition cursor-pointer"
            >
              <img
                src={livro.capa}
                alt={livro.titulo}
                className="w-full h-60 object-cover rounded-md"
              />
              <h2 className="mt-3 text-lg font-semibold">{livro.titulo}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}