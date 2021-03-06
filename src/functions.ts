export function Convenios(codconvenio: number): number {
  let response = 0;
  if (codconvenio === 2) {
    response = 44;
  } else if (codconvenio === 3) {
    response = 45;
  } else if (codconvenio === 4) {
    response = 43;
  } else if (codconvenio === 5) {
    response = 46;
  } else if (codconvenio === 6) {
    response = 47;
  } else if (codconvenio === 7) {
    response = 48;
  } else if (codconvenio === 8) {
    response = 55;
  } else if (codconvenio === 9) {
    response = 56;
  } else if (codconvenio === 10) {
    response = 61;
  } else if (codconvenio === 11) {
    response = 62;
  } else {
    response = codconvenio;
  }
  return response;
}
export function Procedimentos(codConvenio: number): number {
  let response = 0;

  if (codConvenio === 1) {
    response = 1;
  }
  if (codConvenio === 2) {
    response = 3;
  }
  if (codConvenio === 3) {
    response = 7;
  }
  if (codConvenio === 4) {
    response = 46;
  }
  if (codConvenio === 5) {
    response = 8;
  }

  if (codConvenio === 6) {
    response = 8;
  }
  if (codConvenio === 7) {
    response = 9;
  }
  if (codConvenio === 8) {
    response = 10;
  }
  if (codConvenio === 9) {
    response = 11;
  }
  if (codConvenio === 10) {
    response = 12;
  }

  if (codConvenio === 11) {
    response = 13;
  }
  if (codConvenio === 63) {
    response = 14;
  }
  return response;
}

export function formatarData(date: string): string {
  const arrayDate = date.split('-');
  return arrayDate[2] + '/' + arrayDate[1] + '/' + arrayDate[0];
}


export const hora = () => {
  const todayDate = new Date();
  let hora;
  let minutos;
  let seconds;
  if (todayDate.getHours() < 10) {
    hora = '0' + todayDate.getHours();
  } else {
    hora = todayDate.getHours();
  }
  if (todayDate.getMinutes() < 10) {
    minutos = '0' + todayDate.getMinutes();
  } else {
    minutos = todayDate.getMinutes();
  }
  if (todayDate.getSeconds() < 10) {
    seconds = '0' + todayDate.getSeconds();
  } else {
    seconds = todayDate.getSeconds();
  }
  return hora + ':' + minutos + ':' + seconds;
}

export const data = () => {
  const todayDate = new Date();
  const todayArray = todayDate.toLocaleDateString().split('/');

  var todayYear = todayArray[2];
  var todayMonth = todayArray[1];
  var todayDay = todayArray[0];

  return todayYear + '-' + todayMonth + '-' + todayDay;
}

export const gerarHTML = (nomeFuncionario: string, codigo: string) => {
  return `
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; padding: 40px 30px 40px 30px; font-family: Arial,Helvetica, 
    sans-serif;">
    <tr id="header">
      <td align="center" style="padding: 20px 0 10px 0;">
        <h1 style="font-weight: 200;">SISMED</h1>
        <p style="margin-bottom: 0;">Redefir Senha</p>
      </td>
    </tr>
    <tr id="main">
      <td align="center" bgcolor="#0087cd">
        <h4 class="text-center"><strong>Olá, ${nomeFuncionario}</strong></h4>

        <p>Para continuar com a redefinição de senha, informe o codigo na pagina:</p>
        <p>
          <strong>${codigo}</strong>
          
        </p>

      </td>
    </tr>
    <tr id="footer">
      <td bgcolor="LightGray" style="padding: 10px 0px 10px 0px; text-align:center;">
        <p style="margin-bottom: .25rem;">&copy; 2020 SISMED. Todos os direitos reservados.</p>
      </td>
    </tr>
  </table>
  
  `
}
