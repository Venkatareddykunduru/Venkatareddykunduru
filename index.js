document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    let editIndex = null;
  
    function renderExpenses() {
      expenseList.innerHTML = '';
      const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
      expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between';
        li.innerHTML = `
          ${expense.amount} - ${expense.description} - ${expense.category}
          <div>
            <button class="btn btn-secondary btn-sm me-2 edit-btn" data-index="${index}">Edit</button>
            <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
          </div>
        `;
        expenseList.appendChild(li);
      });
    }
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const amount = document.getElementById('amount').value;
      const description = document.getElementById('description').value;
      const category = document.getElementById('category').value;
  
      const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
      
      const newExpense = { amount, description, category };
  
      if (editIndex !== null) {
        expenses[editIndex] = newExpense;
        editIndex = null;
      } else {
        expenses.push(newExpense);
      }
  
      localStorage.setItem('expenses', JSON.stringify(expenses));
      form.reset();
      renderExpenses();
    });
  
    expenseList.addEventListener('click', function (e) {
      if (e.target.classList.contains('delete-btn')) {
        const index = e.target.getAttribute('data-index');
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
      } else if (e.target.classList.contains('edit-btn')) {
        editIndex = e.target.getAttribute('data-index');
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const expense = expenses[editIndex];
        document.getElementById('amount').value = expense.amount;
        document.getElementById('description').value = expense.description;
        document.getElementById('category').value = expense.category;
      }
    });
  
    renderExpenses(); // Initial rendering of expenses from local storage
  });
  