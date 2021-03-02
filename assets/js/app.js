(() => {
    const fields = {};
    const params = new URLSearchParams(window.location.search);

    for (const field of ['client_id', 'response_type', 'redirect_uri', 'state']) {
        if (!params.has(field)) {
            return alert(`No ${field} passed`);
        }

        fields[field] = params.get(field);
    }

    if (fields['client_id'] !== 'IFTTT') {
        return alert('Wrong client id');
    }

    if (fields['response_type'] !== 'code') {
        return alert('Wrong response type');
    }

    const { state, redirect_uri } = fields;
    const form = document.forms[0];

    document.querySelector('button[type="button"]').addEventListener('click', () => {
        window.location.href = `${redirect_uri}?error=access_denied`;
    })

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const privateKey = form.elements['privateKey'].value;

        if (!privateKey || /^[\d\w]{64}$/.exec(privateKey) === null) {
            return alert('Wrong private key');
        }

        try {
            const code = window.btoa(privateKey).replace(/=/g, '');
            const search = new URLSearchParams({ state, code }).toString();

            window.location.href = `${redirect_uri}?${search}`;
        } catch(error) {
            return alert('Something went wrong');
        }
    })
})();
