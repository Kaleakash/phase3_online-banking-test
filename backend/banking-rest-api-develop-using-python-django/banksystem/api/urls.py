from django.conf.urls import url 

from .views import (
    BranchesAPIView,
    BranchDetailAPIView,
    BanksAPIView,
    BankDetailAPIView,
    CreateAccountAPIView,
    AccountListAPIView,
    DepositAPIView,
    WithdrawAPIView,
    AccountDetailAPIView,
    ClientSignInAPIView,
    TransferAPIView,
    LoansAPIView,
    CustomerRequestAPIView
)

urlpatterns = [
    url(r'^branches/', BranchesAPIView.as_view(),name='branches'),
    url(r'^branch/(?P<pk>[0-9]+)/', BranchDetailAPIView.as_view(),name='branch-detail'),
    url(r'^banks', BanksAPIView.as_view(), name='banks'),
    url(r'^bank/(?P<pk>[0-9]+)/', BankDetailAPIView.as_view(), name='bank-detail'),
    url(r'^create_account/', CreateAccountAPIView.as_view(), name='create-account'),
    url(r'^accounts/', AccountListAPIView.as_view(), name='accounts'),
    url(r'^deposits/', DepositAPIView.as_view(), name='amount deposit'),

    url(r'^withdrawals/', WithdrawAPIView.as_view(), name='amount withdraw'),
    url(r'^account/(?P<pk>[0-9]+)/', AccountDetailAPIView.as_view(), name='amount withdraw'),
    url(r'^signin_account/', ClientSignInAPIView.as_view(), name='signin_account'),
    url(r'^transfer_amount/', TransferAPIView.as_view(), name='transfer amount'),
    url(r'^loan/', LoansAPIView.as_view(), name='loan details'),
    url(r'^customer_request/', CustomerRequestAPIView.as_view(), name='customer request service'), 
]
