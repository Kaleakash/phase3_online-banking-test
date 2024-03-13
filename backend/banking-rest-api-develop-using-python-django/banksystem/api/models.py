# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Branch(models.Model):
    name = models.CharField(max_length=250)
    address = models.CharField(max_length=250)
    branch_code = models.CharField(max_length=250)

    class Meta:
        verbose_name_plural = "Branches"



    def json_object(self):
        return {
            "name":self.name,
            "address":self.address,
            "branch_code":self.branch_code
        }
    
    def __str__(self):
        return self.name

class Loan(models.Model):
    typeofloan = models.CharField(max_length=250)
    rateofinterest = models.DecimalField(max_digits=12,decimal_places=2)


    def json_object(self):
        return {
            "name": self.typeofloan,
            "branch": self.rateofinterest
        }

    def __str__(self):
        return self.typeofloan 

class CustomerRequest(models.Model):
    typeofservice = models.CharField(max_length=250)
    typeofsubservice = models.CharField(max_length=250)
    description = models.CharField(max_length=250)
    account_id=models.IntegerField()

    def json_object(self):
        return {
            "name": self.typeofservice,
            "branch": self.description
        }

    def __str__(self):
        return self.typeofservice
    
class Bank(models.Model):
    name = models.CharField(max_length=250)
    branch = models.ForeignKey(Branch,on_delete=models.CASCADE)


    def json_object(self):
        return {
            "name": self.name,
            "branch": self.branch
        }

    def __str__(self):
        return self.name 

class ClientManager(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name


class Client(models.Model):
    name = models.CharField(max_length=250)
    address = models.CharField(max_length=250)
    emailid = models.CharField(max_length=250)
    password = models.CharField(max_length=250)
    
    def json_object(self):
        return {
            "name":self.name,
            "address":self.address
        }

    def __str__(self):
        return self.name



class Account(models.Model):
    """Represents Bank Account"""
    client = models.ForeignKey(Client,on_delete=models.CASCADE)
    account_type = models.CharField(max_length=250)
    amount = models.IntegerField(default=1000)
    bank = models.ForeignKey(Bank,on_delete=models.CASCADE)
    
    
    @property
    def balance(self):
        
        deposits = sum([deposit.amount for deposit in Deposit.objects.filter(account=self.id)])
        withdrawals = sum([withdrawal.amount for withdrawal in Withdraw.objects.filter(account=self.id)])
        print(deposits,withdrawals)
        total = deposits - withdrawals
        return total

    def json_object(self):
        return {
            "account_type":self.account_type,
            "bank":self.bank

        }

    def __str__(self):
        return str(self.bank)+" "+str(self.account_type)+" Account"


class Transfer(models.Model):
    #account = models.ForeignKey(Account,on_delete=models.CASCADE)
    #branch = models.ForeignKey(Branch,on_delete=models.CASCADE)
    fromaccno=models.IntegerField(default=0)
    toaccno=models.IntegerField(default=0)
    amount=models.IntegerField(default=0)
    def json_object(self):
        return {
            "fromaccno":self.fromaccno,
            "toaccno":self.toaccno,
            "amount":self.amount
        }

    def __str__(self):
        return f'The amount {self.amount} tranfer from  account number {self.fromaccno} to account number {self.toaccno}'


class Withdraw(models.Model):
    amount = models.FloatField()
    account = models.ForeignKey(Account,on_delete=models.CASCADE)


class Deposit(models.Model):
    amount = models.FloatField()
    account = models.ForeignKey(Account,on_delete=models.CASCADE)








