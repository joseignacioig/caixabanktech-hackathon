import { atom } from 'nanostores';

export const userSettingsStore = atom({
    totalBudgetLimit: 1850,
    categoryLimits: {
        Food: 300,
        Transportation: 80,
        Housing: 850,
        Entertainment: 100,
        Health: 50,
        Education: 100,
        Clothing: 50,
        "Gifts and Donations": 100,
        Travel: 100,
        "Other Expenses": 100,
    },
    alertsEnabled: true,
    budgetExceeded: false,
});

if (process.env.NODE_ENV === 'development') {
    window.userSettingsStore = userSettingsStore;
}
