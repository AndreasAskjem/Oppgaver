var model = {
    personer: {
      velgAlle: false,
      trekkAntall: 1,
      liste: [
        { id: 100, navn: 'Per', erValgt: true },
        { id: 101, navn: 'Pål', erValgt: true },
        { id: 102, navn: 'Espen', erValgt: false },
        { id: 103, navn: 'Ole', erValgt: true },
      ]
    },
    trekninger: [
      {
        vinnere: ['Ole'],
        tid: '2018-10-17 17:10',
        deltakere: ['Per', 'Pål', 'Ole']
      }
      , {
        vinnere: ['Per', 'Pål', 'Knut'],
        tid: '2018-10-11 17:10',
        deltakere: ['Per', 'Pål', 'Ole', 'Knut', 'Gunnar']
      }
    ]
  };