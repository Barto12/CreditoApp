import flask

app = flask.Flask(__name__)


@app.route('/solicitar', methods=['POST'])
def solicitar():
    data = flask.request.json
    ingreso_mensual = data.get('ingreso_mensual')
    tipo_solicitud = data.get('tipo_solicitud')  # Puede ser 'prestamo' o 'tarjeta'

    if ingreso_mensual < 30000:
        if tipo_solicitud == 'prestamo':
            monto = 6000
        elif tipo_solicitud == 'tarjeta':
            monto = 2000
    else:
        if tipo_solicitud == 'prestamo':
            monto = 45000
        elif tipo_solicitud == 'tarjeta':
            monto = 15000

    return flask.jsonify({'monto_aprobado': monto})


if __name__ == '__main__':
    app.run(debug=True)
