export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { endpoint, payload } = req.body;

  // Defina o endpoint correto da API Farmina
  let url = '';
  if (endpoint === 'products') {
    url = 'https://gw-c.petgenius.info/wfservice/z1/nutritionalplans/products/list';
  } else if (endpoint === 'specialcares') {
    url = 'https://gw-c.petgenius.info/wfservice/z1/specialcares/list';
  } else {
    return res.status(400).json({ error: 'Endpoint inválido' });
  }

  const user = 'wsfarmina_zendesk';
  const password = 'test';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${user}:${password}`).toString('base64'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar dados da API Farmina', details: err.message });
  }
} 