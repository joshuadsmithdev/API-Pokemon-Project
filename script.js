async function searchPokemon() {
    const input = document.getElementById("pokemon-input").value.trim().toLowerCase();
    const infoDiv = document.getElementById("pokemon-info");
    infoDiv.innerHTML = ""; // Clear previous result

    if (!input) {
      infoDiv.innerHTML = `<p class="error">Please enter a name or ID.</p>`;
      return;
    }

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
      if (!response.ok) throw new Error("Pokémon not found");

      const data = await response.json();
      const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      const image = data.sprites.front_default;
      const types = data.types.map(t => t.type.name).join(", ");

      infoDiv.innerHTML = `
        <h2>${name}</h2>
        <img src="${image}" alt="${name}">
        <p>Type: ${types}</p>
      `;
    } catch (error) {
      infoDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
  }
