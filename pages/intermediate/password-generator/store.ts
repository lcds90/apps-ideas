import { defineStore } from 'pinia';

export const usePasswordGeneratorStore = defineStore('password-generator', {
	state: () => ({
		form: {
			quantity: 1,
			range: 15,
			include: {
				uppercase: true,
				lowercase: true,
				numbers: true,
				symbols: true,
			} as Record<string, boolean>,
		},
		isGenerating: false,
		newPasswords: {
			range: 15,
			passwords: [] as string[],
		},
	}),
	getters: {
		getPasswords: (state) => {
			const passwordSternght = (password: string) => {
				const uppercase = /[A-Z]/g;
				const lowercase = /[a-z]/g;
				const numbers = /[0-9]/g;
				const symbols = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g;
				const tamanhoMinimo = /.{7,}/;

				const uppercaseCount = password.match(uppercase)?.length || 0;
				const lowercaseCount = password.match(lowercase)?.length || 0;
				const numbersCount = password.match(numbers)?.length || 0;
				const symbolsCount = password.match(symbols)?.length || 0;

				const tamanhoValido = tamanhoMinimo.test(password);
				const maiusculaValida = uppercase.test(password);
				const minusculaValida = lowercase.test(password);
				const numeroValido = numbers.test(password);
				const especialValido = symbols.test(password);

				let strenght =
					(uppercaseCount + lowercaseCount + numbersCount + symbolsCount) /
					state.newPasswords.range;

				if (!tamanhoValido) strenght = 0;
				if (
					!maiusculaValida ||
					!minusculaValida ||
					!numeroValido ||
					!especialValido
				)
					strenght -= 0.25;

				strenght = Math.max(0, strenght);

				return {
					Senha: password,
					Força: strenght,
					Copiar: password,
				};
			};

			return state.newPasswords.passwords.map(passwordSternght);
		},
		isFormInvalid: (state) =>
			!Object.values(state.form.include).some((option) => option) ||
			state.form.quantity <= 0 ||
			state.form.range <= 0,
	},
	actions: {
		generateNewPassoword() {
			this.isGenerating = true;
			let initialPassword = '';

			console.log('Generate new password');
			// console.log(this.form);
			this.newPasswords.range = this.form.range;
			this.newPasswords.passwords = this.generatePassword();
			this.isGenerating = false;
		},
		generatePassword() {
			return Array.from({ length: this.form.quantity }, () => {
				let initialPassword = '';
				const mapper = {
					uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
					lowercase: 'abcdefghijklmnopqrstuvwxyz',
					numbers: '0123456789',
					symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
				} as Record<string, string>;

				for (const key in mapper) {
					if (this.form.include[key]) initialPassword += mapper[key];
				}

				const password = initialPassword
					.split('')
					.sort(() => 0.5 - Math.random())
					.slice(0, this.form.range)
					.join('');

				return password;
			});
		},
	},
});
