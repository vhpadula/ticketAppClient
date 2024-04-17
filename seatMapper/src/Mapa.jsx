const renderizarMapa = () => {
    const lugaresDisponiveisMock = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    setLugaresDisponiveis(lugaresDisponiveisMock);
    const mapa = [];

    // Defina o tamanho do seu mapa de acordo com as suas necessidades
    const numeroLinhas = 5;
    const numeroColunas = 10;

    for (let i = 0; i < numeroLinhas; i++) {
        const linha = [];
        for (let j = 0; j < numeroColunas; j++) {
            const lugar = i * numeroColunas + j + 1;
            const disponivel = lugaresDisponiveis.includes(lugar);

            // Estilize a célula do mapa de acordo com o estado do lugar (disponível/ocupado)
            const estiloCelula = {
                display: "inline-block",
                width: "30px",
                height: "30px",
                border: "1px solid black",
                backgroundColor: disponivel ? "green" : "red",
                margin: "2px",
                textAlign: "center",
                lineHeight: "30px",
            };

            linha.push(
                <div key={j} style={estiloCelula}>
                    {lugar}
                </div>
            );
        }
        mapa.push(<div key={i}>{linha}</div>);
    }

    return mapa;
};
export default renderizarMapa;
