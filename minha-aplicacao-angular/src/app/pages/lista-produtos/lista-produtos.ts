import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Produto, Product } from '../../services/produto';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos implements OnInit {
  private produtoService = inject(Produto);

  carregando = signal(true);
  produtos = signal<Product[]>([]);

  ngOnInit() {
    this.produtoService.listarProdutos().subscribe({
      next: (dados) => {
        this.produtos.set(dados);
        this.carregando.set(false);
      },
      error: () => this.carregando.set(false),
    });
  }
}
