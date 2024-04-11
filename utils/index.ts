export const copyToClipboard = (valueToCopy: string) => {
	try {
		navigator.clipboard.writeText(valueToCopy);
	} catch (error) {
		console.error('Não foi possível copiar o texto!');
	}
};
