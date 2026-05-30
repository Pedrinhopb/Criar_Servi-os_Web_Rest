// URL base do backend — muda para produção quando hospedar
const BASE_URL = 'http://localhost:3000/api'

// Função auxiliar para fazer requisições
async function request(method, endpoint, body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  }
  if (body) options.body = JSON.stringify(body)

  const response = await fetch(`${BASE_URL}${endpoint}`, options)
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.mensagem || 'Erro na requisição')
  }
  return data
}

// ── PRODUTOS ──────────────────────────────────────
export const produtosAPI = {
  listar:      ()         => request('GET',    '/produtos'),
  buscar:      (id)       => request('GET',    `/produtos/${id}`),
  criar:       (dados)    => request('POST',   '/produtos', dados),
  atualizar:   (id, dados)=> request('PUT',    `/produtos/${id}`, dados),
  remover:     (id)       => request('DELETE', `/produtos/${id}`),
}

// ── FORNECEDORES ──────────────────────────────────
export const fornecedoresAPI = {
  listar:      ()         => request('GET',    '/fornecedores'),
  buscar:      (id)       => request('GET',    `/fornecedores/${id}`),
  criar:       (dados)    => request('POST',   '/fornecedores', dados),
  atualizar:   (id, dados)=> request('PUT',    `/fornecedores/${id}`, dados),
  remover:     (id)       => request('DELETE', `/fornecedores/${id}`),
}

// ── CLIENTES ──────────────────────────────────────
export const clientesAPI = {
  listar:      ()         => request('GET',    '/clientes'),
  buscar:      (id)       => request('GET',    `/clientes/${id}`),
  criar:       (dados)    => request('POST',   '/clientes', dados),
  atualizar:   (id, dados)=> request('PUT',    `/clientes/${id}`, dados),
  remover:     (id)       => request('DELETE', `/clientes/${id}`),
}

// ── USUÁRIOS ──────────────────────────────────────
export const usuariosAPI = {
  listar:      ()         => request('GET',    '/usuarios'),
  buscar:      (id)       => request('GET',    `/usuarios/${id}`),
  criar:       (dados)    => request('POST',   '/usuarios', dados),
  atualizar:   (id, dados)=> request('PUT',    `/usuarios/${id}`, dados),
  remover:     (id)       => request('DELETE', `/usuarios/${id}`),
}