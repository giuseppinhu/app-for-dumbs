async function gerar() {
  const prompt = document.getElementById('prompt').value.trim();
  const cookie = document.getElementById('auth').value.trim();
  const count = parseInt(document.getElementById('count').value);
  const frontRes = document.getElementById('frontRes');

  if (!prompt || !cookie) {
    alert("Preencha o prompt e o token.");
    return;
  }

  frontRes.style.display = 'block'
  frontRes.innerHTML = `<p>Gerando imagens...</p><br /><img class="gif" src="https://media1.tenor.com/m/FfYjdjpr3bgAAAAd/homer-the-simpsons.gif" alt="Homer GIF">`;

  try {
    const res = await fetch("http://localhost:8080/image/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt, count, cookie })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Erro desconhecido.");
    }

    console.log(data)

    const imageUrls = data.images.map(img => `data:image/jpeg;base64,${img.encodedImage}`);

    if (imageUrls.length > 0) {
      window.electronAPI.downloadImages(imageUrls);
    }

  } catch (err) {
    frontRes.innerHTML = `<p style="color:red;">Erro: ${err.message}</p>`;
  }
}

window.electronAPI.onDownloadComplete(() => {
  alert('Download concluído!');
})