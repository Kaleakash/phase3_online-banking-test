FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /main
WORKDIR /main
COPY . /main/
COPY manage.py .
RUN pip install -r requirements.txt
