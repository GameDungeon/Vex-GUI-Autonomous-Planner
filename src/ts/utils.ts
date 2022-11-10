export function map_range(value: number, input_start: number, input_end: number, output_start: number, output_end: number) {
    var slope = (output_end - output_start) / (input_end - input_start);
    return output_start + slope * (value - input_start);
}

export function midpoint(x1, y1, x2, y2) {
	return [(x1 + x2) / 2, (y1 + y2) / 2];
}