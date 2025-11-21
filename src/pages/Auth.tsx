// Auth.tsx removido: página agora não exibe login nem cadastro
// Você pode redirecionar ou mostrar apenas uma mensagem, caso queira.


import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Auth() {
const navigate = useNavigate();


// Redireciona automaticamente para a home
React.useEffect(() => {
navigate('/');
}, [navigate]);


return (
<div className="min-h-screen flex items-center justify-center">
<p>Redirecionando...</p>
</div>
);
}
