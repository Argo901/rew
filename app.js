document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById('submit');
    const inputForm = document.querySelector('.input-form');
    const receipt = document.querySelector('.receipt');
    const priceInput = document.getElementById('price');
    const priceError = document.getElementById('price-error');
    const codeWordInput = document.getElementById('code-word');
    const CODE_WORD = "300"; // Кодовое слово для суммы
    const MOVE_BUTTON_CODE = "Нет чекам"; // Чит-код для перемещения кнопки

    // Проверка лимита для поля price
    priceInput.addEventListener('input', function() {
        const priceValue = Number(priceInput.value);
        if (priceValue > 300 && codeWordInput.value.trim() !== CODE_WORD) {
            priceError.style.display = 'block';
            priceInput.value = 300; // Ограничиваем значение
        } else {
            priceError.style.display = 'none';
        }
    });

    // Проверка чит-кода для перемещения кнопки
    codeWordInput.addEventListener('input', function() {
        if (codeWordInput.value.trim() === MOVE_BUTTON_CODE) {
            submitButton.style.position = 'absolute';
            submitButton.style.transition = 'all 0.5s ease';
            submitButton.style.left = `${Math.random() * 100}%`;
            submitButton.style.top = `${Math.random() * 100}%`;
        }
    });

    // Обработчик нажатия на кнопку "Отправить"
    submitButton.addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const phoneNumber = document.getElementById('number').value;
        const price = document.getElementById('price').value;
        const codeWord = document.getElementById('code-word').value;

        // Проверка правильности введенных данных
        if (!name || !phoneNumber || !price) {
            alert("Пожалуйста, заполните все поля!");
            return;
        }

        // Проверка на кодовое слово для суммы более 300
        if (price > 300 && codeWord.trim() !== CODE_WORD) {
            alert("Для суммы более 300 необходимо ввести правильное кодовое слово.");
            return;
        }

        // Прячем форму и показываем чек
        inputForm.style.display = 'none';
        receipt.style.display = 'block';

        // Заполнение данных чека
        document.getElementById('recipient-name').textContent = name;
        document.getElementById('transaction-date').textContent = new Date().toLocaleString();
        document.querySelector('.amount').textContent = `Сумма: ${price} руб.`;

        // Закрытие чека
        const closeButton = document.querySelector('.close-icon');
        closeButton.addEventListener('click', function() {
            receipt.style.display = 'none';
            inputForm.style.display = 'block';
            document.getElementById('name').value = '';
            document.getElementById('number').value = '';
            document.getElementById('price').value = '';
            document.getElementById('code-word').value = '';
        });
    });
});