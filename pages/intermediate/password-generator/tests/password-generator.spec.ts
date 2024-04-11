import { describe, expect, test, vi } from 'vitest';
import { DOMWrapper, mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { usePasswordGeneratorStore } from '../store';

import PasswordGeneratorProject from '../index.vue';

describe('🗂️  Projeto: password-generator', () => {
	const wrapper = mount(PasswordGeneratorProject, {
		global: {
			plugins: [createTestingPinia({ stubActions: false, createSpy: vi.fn })],
		},
	});
	const el = {
		button: wrapper.find('button#submit') as DOMWrapper<HTMLButtonElement>,
		quantity: wrapper.find('input#quantity') as DOMWrapper<HTMLInputElement>,
		length: wrapper.find('input#length') as DOMWrapper<HTMLInputElement>,
		uppercase: wrapper.find('input#uppercase') as DOMWrapper<HTMLInputElement>,
		lowercase: wrapper.find('input#lowercase') as DOMWrapper<HTMLInputElement>,
		numbers: wrapper.find('input#numbers') as DOMWrapper<HTMLInputElement>,
		symbols: wrapper.find('input#symbols') as DOMWrapper<HTMLInputElement>,
		form: wrapper.find('form#form-generator') as DOMWrapper<HTMLFormElement>,
		tablePasswords: () =>
			wrapper.find('div#table-passwords') as DOMWrapper<HTMLElement>,
	};

	const store = usePasswordGeneratorStore();

	const resetPasswords = () => {
		el.lowercase.setValue(false);
		el.uppercase.setValue(false);
		el.numbers.setValue(false);
		el.symbols.setValue(false);
		store.newPasswords = {
			range: Number(el.quantity.element.value),
			passwords: [] as string[],
		};
	};

	test('🚀 Deve enderizar componente', () => {
		expect(wrapper.exists()).toBeTruthy();
	});

	test('🔎 Deve renderizar botão', () => {
		expect(el.button.exists()).toBeTruthy();
	});

	test('🔎 Deve renderizar inputs', () => {
		expect(el.length.exists()).toBeTruthy();
		expect(el.uppercase.exists()).toBeTruthy();
		expect(el.lowercase.exists()).toBeTruthy();
		expect(el.numbers.exists()).toBeTruthy();
		expect(el.symbols.exists()).toBeTruthy();
	});

	describe('🔂 Geração de senhas', () => {
		test('🔎 Deve renderizar inputs com valores padrões', () => {
			expect(el.length.element.value).toBe('15');
			expect(el.uppercase.element.checked).toBe(true);
			expect(el.lowercase.element.checked).toBe(true);
			expect(el.numbers.element.checked).toBe(true);
			expect(el.symbols.element.checked).toBe(true);
		});

		test('🌠 Deve renderizar senha gerada', async () => {
			expect(store.getPasswords.length).toBe(0);
			expect(el.tablePasswords().exists()).toBeFalsy();
			expect(el.button.element.disabled).toBeFalsy();
			await el.quantity.setValue(5);
			await el.form.trigger('submit');
			await wrapper.vm.$nextTick();
			expect(store.getPasswords.length).toBe(5);
			expect(el.tablePasswords().exists()).toBeTruthy();
		});

		test('✅ Deve liberar o botão somente se o formulário estiver válido', async () => {
			expect(el.button.element.disabled).toBeFalsy();
			await el.quantity.setValue(0);
			expect(el.button.element.disabled).toBeTruthy();
			await el.quantity.setValue(1);
			await el.uppercase.setValue(false);
			await el.lowercase.setValue(false);
			await el.numbers.setValue(false);
			await el.symbols.setValue(false);
			expect(el.button.element.disabled).toBeTruthy();
		});

		describe('📙 Geração de senha somente com único input', () => {
			test.each([
				['uppercase', /^[A-Z]+$/],
				['lowercase', /^[a-z]+$/],
				['numbers', /^[0-9]+$/],
				['symbols', /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/],
			])('☑️  Somente do tipo %s', async (inputType, regex) => {
				resetPasswords();
				// @ts-ignore
				await el[inputType].setValue(true);
				expect(el.button.element.disabled).toBeFalsy();
				await el.form.trigger('submit');
				await wrapper.vm.$nextTick();
				expect(store.getPasswords.length).toBe(1);
				expect(store.getPasswords[0].password).toMatch(regex);
			});
		});

		const combinations = [
			{
				inputs: ['uppercase', 'lowercase'],
				regex: /[A-Z][a-z]+/,
			},
			{
				inputs: ['lowercase', 'numbers'],
				regex: /[a-z][0-9]+/,
			},
			{
				inputs: ['uppercase', 'symbols'],
				regex: /[A-Z][!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
			},
			{
				inputs: ['numbers', 'symbols'],
				regex: /[0-9][!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
			},
			{
				inputs: ['numbers', 'symbols', 'lowercase'],
				regex:
					/^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-z]).*$/,
			},
			{
				inputs: ['numbers', 'symbols', 'uppercase'],
				regex:
					/^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[A-Z]).*$/,
			},
		];

		describe('📚 Geração de senha com vários inputs', () => {
			combinations.forEach(({ inputs, regex }) => {
				test('☑️  Combinação de: ' + inputs.join(' + '), async () => {
					resetPasswords();
					inputs.forEach(async (input) => {
						// @ts-ignore
						await el[input].setValue(true);
					});

					expect(el.button.element.disabled).toBeFalsy();
					await el.form.trigger('submit');
					await wrapper.vm.$nextTick();
					expect(store.getPasswords.length).toBe(1);
					expect(store.getPasswords[0].password).toMatch(regex);
				});
			});
		});
	});
});
