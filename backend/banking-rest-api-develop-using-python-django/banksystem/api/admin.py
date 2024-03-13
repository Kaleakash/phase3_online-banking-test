# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import (
    Branch,
    Bank,
    Account,
    Loan,
    Transfer,
    Withdraw,
    Deposit,
    CustomerRequest,
    
)
# Register your models here.
admin.site.register(Branch)
admin.site.register(Bank)
admin.site.register(Loan)
admin.site.register(Account)
admin.site.register(Transfer)
admin.site.register(Withdraw)
admin.site.register(Deposit)
admin.site.register(CustomerRequest)


