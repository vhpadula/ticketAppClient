import React, { useState, useEffect } from "react";

const MapaArquibancadas = () => {
    const [lugaresDisponiveis, setLugaresDisponiveis] = useState([]);
    const lugaresDisponiveisMock = [
        "A1",
        "A2",
        "B1",
        "B2",
        "C4",
        "J5",
        "F3",
        "E8",
        "J9",
        "A9",
    ];

    useEffect(() => {
        const fetchLugaresDisponiveis = async () => {
            try {
                const response = await fetch(
                    "http://35.247.202.166:8080/ticket-service/ticket"
                ); // Substitua 'URL_DO_SEU_BACKEND' pela URL real do seu backend

                if (!response.ok) {
                    console.log(response);
                    throw new Error("Erro ao buscar lugares disponíveis");
                }
                const data = await response.json();
                const lugaresDisponiveis = data
                    .filter((seat) => !seat.isPurchased)
                    .map((seat) => seat.seat);
                setLugaresDisponiveis(lugaresDisponiveis);
            } catch (error) {
                setLugaresDisponiveis(lugaresDisponiveisMock);
                console.error(error);
            }
        };

        const interval = setInterval(fetchLugaresDisponiveis, 1000); // Consulta a cada 5 segundos
        return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
    }, []);
    // Function to handle seat purchase
    const handlePurchase = async (lugar) => {
        try {
            const letra = lugar.charAt(0);
            const numero = lugar.charAt(1);
            const id = parseInt(letra.charCodeAt(0) - 64 + numero);
            const response = await fetch(
                `http://35.247.202.166:8080/pucharse-service/pucharse/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
                { mode: "no-cors" }
            );
            setLugaresDisponiveis(
                lugaresDisponiveis.filter((l) => l !== lugar)
            );
            if (!response.ok) {
                console.log(response);
                throw new Error("Erro ao efetuar a compra do lugar");
            }
            // Handle successful purchase
        } catch (error) {
            console.error(error);
        }
    };
    // Função para renderizar o mapa de lugares
    const renderMapa = () => {
        const mapa = [];
        const letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        for (let i = 0; i < 10; i++) {
            const fileira = [];
            for (let j = 0; j < 10; j++) {
                const lugar = `${letras[i]}${j + 1}`;
                const disponivel = lugaresDisponiveis.includes(lugar);
                fileira.push(
                    <div
                        key={j}
                        style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: disponivel ? "green" : "red",
                            margin: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <button
                            onClick={() => handlePurchase(lugar)}
                            style={{
                                background: "transparent",
                                border: "none",
                                padding: "0",
                                cursor: "pointer",
                            }}
                        >
                            {lugar}
                        </button>
                    </div>
                );
            }
            mapa.push(
                <div
                    key={i}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    {fileira}
                </div>
            );
        }
        return mapa;
    };

    return (
        <div>
            <h1>Mapa das Arquibancadas</h1>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {renderMapa()}
            </div>
        </div>
    );
};

export default MapaArquibancadas;
