FROM postgres:12.7


# Generate locale C.UTF-8 for postgres and general locale data
ENV LANG C.UTF-8
ENV TZ=America/Guayaquil

# Set timezone
# RUN ln -sf /usr/share/zoneinfo/$TZ /etc/localtime

# Install some deps, lessc and less-plugin-clean-css, and wkhtmltopdf
RUN apt update && apt install postgis -y postgresql-12-postgis-3 

COPY ./script/init.sql /docker-entrypoint-initdb.d
