let donut;

function render(donutChart) {
	let xml = new XMLHttpRequest();
	xml.open('GET', '/api/v1/data');
	xml.send();
	xml.onreadystatechange = () => {
		if (xml.readyState === 4) {
			// Remove Loading
			document.querySelectorAll('.card').forEach((card) => {
				card.classList.remove('loading-card');
				card.classList.add('hoverable');
			});
			document.querySelectorAll('.loading').forEach((element) => {
				element.dataset.loading = 'false';
                setTimeout(() => {
                    element.remove();
                }, 500);
			});
			document.querySelectorAll('.loader').forEach((element) => {
                element.dataset.loading = 'false';
                setTimeout(() => {
                    element.remove();
                }, 500);
			});
            document.getElementById('chart').dataset.loading = false;

            // Parse Response
			const { coleg_gwent, bridgend_college } = JSON.parse(
				xml.responseText,
			);

			// Update Points
			const cgp = document.querySelector('#cgp');
			const bcp = document.querySelector('#bcp');
			cgp.innerHTML = coleg_gwent.points;
			bcp.innerHTML = bridgend_college.points;

			// Update Position
			const cgpos = document.querySelector('#cgpos');
			const bcpos = document.querySelector('#bcpos');
			cgpos.innerHTML = coleg_gwent.position;
			bcpos.innerHTML = bridgend_college.position;

			// Update Winning Message
			const winning = document.querySelector('#winning');
			winning.innerHTML =
				coleg_gwent.points > bridgend_college.points
					? `Coleg Gwent Is Winning By ${
							coleg_gwent.points - bridgend_college.points
					  } Points`
					: `Bridgend College Is Winning By ${
							bridgend_college.points - coleg_gwent.points
					  } Points`;

			// Chart
			const ctx = document.getElementById('chart');
			const data = {
				labels: ['Coleg Gwent', 'Bridgend College'],
				datasets: [
					{
						data: [coleg_gwent.points, bridgend_college.points],
						backgroundColor: [
							'rgb(255, 50, 60)',
							'rgb(255, 205, 86)',
						],
						hoverOffset: 4,
					},
				],
			};
			const config = {
				type: 'doughnut',
				data: data,
				options: {
					responseive: true,
					maintainAspectRatio: true,
					aspectRatio: 1 / 1,
					borderColor: 'hsl(0, 0%, 30%)',
					rotation: 180,
					animation: {
						duration: 0,
					}
				},
			};
			if (donutChart === undefined) {
				donut = new Chart(ctx, config);
			} else {
				donutChart.data = config.data;
				donutChart.options = config.options;
				donutChart.update();
			}
		}
	};
}

render(donut);
setInterval(() => {
	render(donut);
}, 30000);
