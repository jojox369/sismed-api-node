export function HealthInsurances(codconvenio: number): number {
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
export function Procedures(codConvenio: number): number {
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

export const GenerateNewTime = () => {
	const todayDate = new Date();
	let hours;
	let minutes;
	let seconds;
	if (todayDate.getHours() < 10) {
		hours = '0' + todayDate.getHours();
	} else {
		hours = todayDate.getHours();
	}
	if (todayDate.getMinutes() < 10) {
		minutes = '0' + todayDate.getMinutes();
	} else {
		minutes = todayDate.getMinutes();
	}
	if (todayDate.getSeconds() < 10) {
		seconds = '0' + todayDate.getSeconds();
	} else {
		seconds = todayDate.getSeconds();
	}
	return hours + ':' + minutes + ':' + seconds;
};

export const GenerateNewDate = () => {
	const todayDate = new Date();
	const date = todayDate.toISOString().split('T')[0];

	return date;
};

export const generateHTML = (nomeFuncionario: string, codigo: string) => {
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
  
  `;
};

export const USDateFormatter = (date: string): string => {
	const dateFormatted = date.split('/');

	return `${dateFormatted[2]}-${dateFormatted[1]}-${dateFormatted[0]}`;
};

export const AgeCalculator = (dateBirth: string | null) => {
	let response = 'Data nascimento não cadastrada';

	if (dateBirth) {
		const todayDate = new Date();
		const todayArray = todayDate.toLocaleDateString().split('/');
		const nascimentoArray = dateBirth.split('-');

		// Informações sobre a data atual
		const todayYear = Number(todayArray[2]);
		const todayMonth = Number(todayArray[1]);
		const todayDay = Number(todayArray[0]);

		// Informações da data de nascimento do paciente
		const yearNascimento = Number(nascimentoArray[0]);
		const monthNascimento = Number(nascimentoArray[1]);
		const dayNascimento = Number(nascimentoArray[2]);

		let age = todayYear - yearNascimento;

		/*Caso o mes atual seja menor que o mes do nascimento
			aniversario ainda não passou
		*/
		if (todayMonth < monthNascimento) {
			age--;
		}
		// Esta no mes do aniversario
		else if (todayMonth === monthNascimento) {
			/*Caso o dia atual seja menor que o dia do nascimento
				aniversario ainda não passou
			*/
			if (todayDay < dayNascimento) {
				age--;
			}
		}
		response = `${age} Anos`;
	}

	return response;
};

export const CompareDates = (schedulingDate: string) => {
	const todayDate = new Date();
	const schedulingArray = schedulingDate.split('-');
	const todayArray = todayDate.toLocaleDateString().split('/');

	// Informações sobre a data atual
	const todayYear = Number(todayArray[2]);
	const todayMonth = Number(todayArray[1]);
	const todayDay = Number(todayArray[0]);

	// Informações da data do agendamento
	const schedulingYear = Number(schedulingArray[0]);
	const schedulingMonth = Number(schedulingArray[1]);
	const schedulingDay = Number(schedulingArray[2]);

	// Caso seja ano diferente, não é editavel
	if (schedulingYear < todayYear) {
		return false;
	}
	// Caso seja mes diferente, não é editavel
	else if (schedulingMonth < todayMonth) {
		return false;
	}
	// Caso seja dia diferente, não é editavel
	else if (
		schedulingDay < todayDay &&
		schedulingMonth === todayMonth &&
		schedulingYear === todayYear
	) {
		return false;
	} else {
		/*Se cair nessa condição, isso quer dizer que a data do agendamento é igual ou maior que a data atual
	ou seja, o agendamento é editavel
*/
		return true;
	}
};

export const FormatHealthInsuranceName = (
	healthInsuranceTypeName: string,
	healthInsuranceName: string
) => {
	if (healthInsuranceTypeName.toLowerCase() === 'particular') {
		return healthInsuranceTypeName;
	} else {
		return `${healthInsuranceName} - ${healthInsuranceTypeName}`;
	}
};

export const StringFormatter = (name: string) => {
	return name.replace(/(?:^|\s)\S/g, function (a) {
		return a.toUpperCase();
	});
};
