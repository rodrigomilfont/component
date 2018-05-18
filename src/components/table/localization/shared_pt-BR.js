import { merge } from 'lodash'

const shipment = {
  status: {
    'canceled': 'Cancelado',
    'declined': 'Declinado',
    'done': 'Entregue',
    'heading-to-load': 'Indo coletar',
    'in-transit': 'Em trânsito',
    'loading': 'Carregando',
    'not-found': 'Sem status',
    'not-picked-up': 'Não coletado',
    'pre-scheduled': 'Pré agendado',
    'ready': 'Pronto',
    'reprogrammed': 'Reprogramado',
    'scheduled': 'Agendado',
    'searching-truckers': 'Procurando veículo',
    'trucker-selected': 'Veículo encontrado',
    'unloading': 'Descarregando',
    'waiting-distribution': 'Distribuição',
    'waiting-to-load': 'Fila coleta',
    'waiting-to-unload': 'Fila descarga'
  }
}

const translations = {
  app: {
    new: 'Novo',
    save: 'Salvar',
    clear: 'Limpar',
    name: 'Nome',
    client: 'Cliente',
    email: 'E-mail',
    date: {
      none: 'Sem data',
      formats: {
        date: 'DD/MM/YYYY',
        datetime: 'DD/MM/YYYY HH:mm',
        server_datetime: 'YYYY-MM-DD HH:mm',
        input_date: 'dd/mm/yyyy'
      }
    },
    error: {
      could_not_save: 'Ops! Não foi possível salvar os dados, tente novamente.'
    }
  },
  table: {
    columns: {
      actions: 'Ações',
      activities: 'Atividades',
      companies: 'Empresas',
      contact: 'Contato',
      conversion: 'Conversão',
      customer: 'Cliente',
      destiny: 'Destino',
      driver: 'Motorista',
      estimated_time_of_arrival: 'Entrega estimada',
      executive: 'Executivo',
      id: 'ID',
      negotiation: 'Negociação',
      origin: 'Origem',
      pick_up_date: 'Coleta',
      real_delivery: 'Entrega real',
      salesperson_name: 'Venda',
      schedule: 'Prazo',
      scheduled_collection_date: 'Coleta agendada',
      scheduled_deadline: 'Prazo agendado',
      scheduled_delivery: 'Entrega agendada',
      seller: 'Vendedor',
      situation: 'Situação',
      state: 'Estado',
      status: 'Status',
      tracking: 'Rastreio',
      truck: 'Veículo',
      trucker_seeker_name: 'Operação',
      value: 'Valor'
    },
    filters: {
      internal_sales: 'Interno',
      external_sales: 'Externo',
      period: {
        closed: 'Encerrados',
        active: 'Ativos'
      }
    }
  },
  select_tag: {
    no_results: 'Sem resultados',
    no_results_for: 'Sem resultados para'
  },
  query_filter: {
    filtered_by: 'Filtrado por',
    attributes: {
      status: {
        values: shipment.status,
        label: 'Status',
        reasons: {
          'broken-vehicle': 'Veículo quebrado',
          'cargox-declined': 'CargoX declinou o frete',
          'cargox-informed-wrong-vehicle': 'CargoX informou veículo incorreto',
          'customer-informed-wrong-vehicle': 'Cliente informou veículo incorreto',
          'customer-gave-up': 'Cliente desistiu',
          'duplicated-freight': 'Frete duplicado',
          'customer-affected-by-strike': 'Greve (da parte do cliente)',
          'further-needs-not-informed-by-cargox': 'CargoX não informou necessidades adicionais',
          'further-needs-not-informed-by-customer': 'Cliente não informou necessidades adicionais',
          'incomplete-cargo': 'Carga incompleta',
          'insurance-restriction': 'Restrição do seguro',
          'low-price': 'Preço baixo',
          'missing-cargo-invoice': 'Falta de Nota Fiscal do cliente',
          'strike': 'Greve',
          'trucker-profile': 'Perfil de caminhoneiro na região',
          'unavailable-cargo': 'Produto indisponível'
        }
      },
      trucker_seeker_id: {
        label: 'Operação'
      },
      trucker_name: {
        label: 'Motorista'
      },
      salesperson_id: {
        label: 'Vendas'
      },
      origin_keyword: {
        label: 'Origem'
      },
      destination_keyword: {
        label: 'Destino'
      },
      customer_id: {
        label: 'Cliente'
      },
      shipment_id: {
        label: 'ID da carga'
      },
      id_or_customer_tracking_number: {
        label: 'ID'
      },
      delivered_before: {
        label: 'Entrega Real (data final)'
      },
      delivered_after: {
        label: 'Entrega Real (data inicial)'
      },
      delivery_before: {
        label: 'Entrega Agendada (data final)'
      },
      delivery_after: {
        label: 'Entrega Agendada (data inicial)'
      },
      pick_up_before: {
        label: 'Coleta (data final)'
      },
      pick_up_after: {
        label: 'Coleta (data inicial)'
      },
      eta_before: {
        label: 'Entrega Estimada (data final)'
      },
      eta_after: {
        label: 'Entrega Estimada (data inicial)'
      },
      documents: {
        label: 'Documentos'
      },
      payments: {
        label: 'Pagamentos'
      },
      activities_filter: {
        label: 'Atividades',
        values: {
          all: 'todas',
          is_due: 'atrasadas',
          due_today: 'para hoje',
          due_in_7: 'próximos 7 dias',
          due_in_30: 'próximos 30 dias',
          no_activities: 'sem atividade'
        }
      },
      keyword: {
        label: 'Termo'
      }
    }
  },
  filter: {
    date_range: {
      from: 'de',
      until: 'até'
    }
  },
  shipment: {
    collection_date: 'Data de coleta',
    delivery_date: 'Data de entrega',
    tooltips: {
      id: 'ID CargoX %{shipment_id}',
      ids: 'ID CargoX %{shipment_id}\nID Carregamento %{customer_tracking}'
    },
    status: shipment.status
  }
}

export const daterangepicker = {
  format: 'DD/MM/YYYY',
  separator: ' - ',
  applyLabel: 'Aplicar',
  cancelLabel: 'Cancelar',
  fromLabel: 'De',
  toLabel: 'Até',
  customRangeLabel: 'Custom',
  weekLabel: 'S',
  daysOfWeek: [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sab'
  ],
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  firstDay: 1
}

export const validatejs = {
  validators: {
    presence: {
      message: 'não pode ficar em branco'
    },
    length: {
      notValid: 'tamanho inválido',
      wrongLength: 'não possui o tamanho esperado (tamanho: %{count})',
      tooShort: 'é muito curto (tamanho mínimo: %{count})',
      tooLong: 'é muito longo (tamanho máximo: %{count})'
    },
    numericality: {
      notValid: 'deve ser um número válido',
      notInteger: 'não é um número inteiro',
      notGreaterThan: 'deve ser maior que %{count}',
      notGreaterThanOrEqualTo: 'deve ser maior ou igual a %{count}',
      notLessThan: 'deve ser menor que %{count}',
      notLessThanOrEqualTo: 'deve ser menor ou igual a %{count}',
      notOdd: 'deve ser ímpar',
      notEven: 'deve ser par'
    },
    date: {
      notValid: 'deve ser uma data válida',
      tooEarly: 'deve ser anterior a %{date}',
      tooLate: 'deve ser depois de %{date}'
    },
    format: {
      message: 'é inválido'
    },
    inclusion: {
      message: 'não está incluído na lista'
    },
    exclusion: {
      message: 'não está disponível'
    },
    email: {
      message: 'é inválido'
    },
    equality: {
      message: 'deve ser igual a %{count}'
    },
    url: {
      message: 'url inválida'
    },
    cpf: {
      message: 'CPF inválido'
    },
    isoDate: {
      invalid: 'Data inválida',
      not_after: 'Data tem de ser após',
      not_before: 'Data tem de ser anterior a'
    }
  }
}

merge(translations, { validatejs, daterangepicker })

export default translations
